-- Consolidate admin_users RLS policies.
-- Owners can manage all admin profiles; non-owners can only read their own profile.

drop policy if exists admin_read_own_profile on public.admin_users;
drop policy if exists owner_manage_admin_users on public.admin_users;

create policy admin_users_select
on public.admin_users
for select
to authenticated
using (
  user_id=(select auth.uid())
  or (select private.is_owner())
);

create policy admin_users_insert_owner
on public.admin_users
for insert
to authenticated
with check ((select private.is_owner()));

create policy admin_users_update_owner
on public.admin_users
for update
to authenticated
using ((select private.is_owner()))
with check ((select private.is_owner()));

create policy admin_users_delete_owner
on public.admin_users
for delete
to authenticated
using ((select private.is_owner()));
