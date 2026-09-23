resource "supabase_project" "production" {
  organization_id   = var.supabase_organization_id
  name              = "moriah_project_v2"
  database_password = var.supabase_database_password
  region            = "us-west-2"

  lifecycle {
    ignore_changes = [database_password]
  }
}