# -----------------------------
# LOAD ENVIRONMENTS
# -----------------------------

source .env
if [ -f base.env ]; then
  source base.env
  echo "✅ Loaded base.env"
else
  echo "⚠️ base.env not found, skipping."
fi

ENV=${1:-${ENVIRONMENT:-${BITBUCKET_DEPLOYMENT_ENVIRONMENT:-}}}
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

echo AWS_ACCOUNT_ID=$AWS_ACCOUNT_ID

S3_BUCKET_NAME="${S3_BUCKET_NAME}-${AWS_ACCOUNT_ID}"

echo "🚀 Creating runner role..."
set +e
DEPLOY_OUTPUT=$(aws cloudformation deploy \
  --no-cli-pager \
  --stack-name "$STACK_NAME-runner-role" \
  --template-file aws/runner-role.yaml \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
  --region "$REGION" \
  --parameter-overrides \
    WorkspaceId="$WORKSPACE_ID" \
    RepoName="$REPO_NAME" \
    BucketName="$S3_BUCKET_NAME" \
    OidcProviderArn="arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/api.bitbucket.org/2.0/workspaces/primeaawascodebase/pipelines-config/identity/oidc"2>&1)
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