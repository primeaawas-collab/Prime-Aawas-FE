#!/bin/bash
set -e

# -----------------------------
# LOAD ENVIRONMENTS
# -----------------------------
if [ -f .env ]; then
  source .env
  echo "✅ Loaded .env"
else
  echo "⚠️ base.env not found, skipping."
fi

ENV=${1:-${ENVIRONMENT}}
if [ -z "$ENV" ]; then
  echo "⚠️ No environment specified. Assuming Bitbucket or system vars."
else
  case "$ENV" in
    dev)  ENV_FILE="dev.env" ;;
    prod) ENV_FILE="prod.env" ;;
    *)    echo "⚠️ Unknown environment '$ENV', skipping specific env file." ; ENV_FILE="" ;;
  esac

  if [ -n "${ENV_FILE:-}" ] && [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
    echo "✅ Loaded $ENV_FILE"
  else
    echo "⚠️ $ENV_FILE not found, skipping."
  fi
fi


# -----------------------------
# RUN NPM BUILD BASED ON ENV
# -----------------------------
if [ "$ENV" = "dev" ]; then
  echo "🚧 Running development build..."
  npm run build:dev
elif [ "$ENV" = "prod" ]; then
  echo "🚀 Running production build..."
  npm run build:prod
else
  echo "⚠️ Unknown environment, skipping build."
fi


sanitize_var() { echo "$1" | tr -d '\r\n' | xargs; }

S3_BUCKET_NAME=$(sanitize_var "${S3_BUCKET_NAME:-}")
AWS_ACCOUNT_ID=$(sanitize_var "${AWS_ACCOUNT_ID:-}")

S3_BUCKET_NAME="${S3_BUCKET_NAME}-${AWS_ACCOUNT_ID}"
echo "Derived Bucket Name: $S3_BUCKET_NAME"



ACM_CERTIFICATE_ARN="arn:aws:acm:us-east-1:${AWS_ACCOUNT_ID}:certificate/${ACM_CERTIFICATE_ID}"

aws s3 sync ./dist/prime-aawas/browser/ s3://$S3_BUCKET_NAME

echo "🚀 Deploying stack..."

echo "BUCKET NAME: $S3_BUCKET_NAME"
echo "DOMAIN NAME: $DOMAIN_NAME"
echo "ACM CERTIFICATE ARN: $ACM_CERTIFICATE_ARN"
set +e
DEPLOY_OUTPUT=$(aws cloudformation deploy \
  --stack-name "$STACK_NAME" \
  --template-file aws/deployment.yaml \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
  --region "$REGION" \
  --parameter-overrides \
    DomainName=$(sanitize_var "${DOMAIN_NAME}") \
    BucketName=$(sanitize_var "${S3_BUCKET_NAME}") \
    AcmCertificateArn=$(sanitize_var "${ACM_CERTIFICATE_ARN}") 2>&1)
DEPLOY_EXIT=$?
set -e

# Handle "no changes" case gracefully
if echo "$DEPLOY_OUTPUT" | grep -q "No changes to deploy"; then
  echo "ℹ️ No changes detected — stack already up to date."
elif [ $DEPLOY_EXIT -ne 0 ]; then
  echo "❌ Stack deployment failed."
  echo "$DEPLOY_OUTPUT"
  exit 1
else
  echo "✅ Stack updated successfully."
fi

# Proceed to invalidation
CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
  --region "$REGION" \
  --output text)

if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "⚠️ No CloudFrontDistributionId found in stack outputs."
  exit 0
fi

echo "🚀 Creating CloudFront invalidation for $CLOUDFRONT_DISTRIBUTION_ID..."
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*" \
  --region "$REGION"

echo "✅ Deployed and invalidated successfully!"