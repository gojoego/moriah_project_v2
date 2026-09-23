variable "supabase_organization_id" {
  description = "Supabase organization slug"
  type        = string
}

variable "supabase_database_password" {
  description = "Password for the Supabase PostgreSQL database"
  type        = string
  sensitive   = true
}