Iac 
- infrastructure as code 
- config defined in code 
- config can be version controlled, reviewed and reproduced 

Terraform
- providers: plugins that allow interaction with external APIs/services
- resources: infrastructure components managed by Terraform
- resource addresses: TF identifier for specific resource 
- tf files: desired state 
- state: record connecting config to actual infrastructure it manages
- importing: allowing Terraform to recognize and manage existing infrastructure components 
- plan: proposed changes 
- apply: changes implemented 
- lifecycle: controls how Terraform manages particular aspects of resource
- input variables set via variables.tf var.<name>
- TF_VAR_ notation for Terraform env var

Purpose
- Terraform manages Moriah's infrastructure configuration.
- Production Supabase project is imported rather than created.

Prerequisites
- Terraform
- Supabase access token

Required environment variables
- SUPABASE_ACCESS_TOKEN
- TF_VAR_supabase_organization_id
- TF_VAR_supabase_database_password

Workflow

terraform init
terraform fmt
terraform validate

terraform import supabase_project.production <SUPABASE_PROJECT_REF>

terraform plan
Safety
- Review plans before applying.
- Never commit secrets or Terraform state.

