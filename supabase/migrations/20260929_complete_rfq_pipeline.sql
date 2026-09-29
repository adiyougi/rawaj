-- Rawaj RFQ pipeline hardening
-- Applied to Supabase project amcqkwoyunxporlafeua on 2026-09-29.

create sequence if not exists public.quote_request_number_seq;

alter table public.quote_requests
  add column if not exists request_number text;

update public.quote_requests
set request_number =
  'RFQ-' || to_char(created_at,'YYYY') || '-' ||
  lpad(nextval('public.quote_request_number_seq')::text,6,'0')
where request_number is null;

alter table public.quote_requests
  alter column request_number set not null;

create unique index if not exists quote_requests_request_number_uidx
  on public.quote_requests(request_number);

create or replace function private.assign_quote_request_number()
returns trigger
language plpgsql
set search_path=''
as $$
begin
  if new.request_number is null or btrim(new.request_number)='' then
    new.request_number :=
      'RFQ-' || to_char(coalesce(new.created_at,now()),'YYYY') || '-' ||
      lpad(nextval('public.quote_request_number_seq')::text,6,'0');
  end if;
  return new;
end;
$$;

drop trigger if exists set_quote_request_number on public.quote_requests;
create trigger set_quote_request_number
before insert on public.quote_requests
for each row execute function private.assign_quote_request_number();

alter table public.quote_requests
  drop constraint if exists quote_requests_status_check;

alter table public.quote_requests
  add constraint quote_requests_status_check
  check (status = any (array[
    'new'::text,
    'reviewing'::text,
    'need_more_info'::text,
    'pricing'::text,
    'quote_ready'::text,
    'sent'::text,
    'negotiation'::text,
    'won'::text,
    'lost'::text,
    'cancelled'::text,
    'archived'::text
  ]));

create or replace function public.create_quote_request_v2(
  p_customer_name text,
  p_phone text,
  p_company_name text default null,
  p_whatsapp text default null,
  p_email text default null,
  p_city text default null,
  p_deadline date default null,
  p_notes text default null,
  p_items jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path=''
as $$
declare
  v_id uuid;
  v_number text;
begin
  v_id := public.create_quote_request(
    p_customer_name,
    p_phone,
    p_company_name,
    p_whatsapp,
    p_email,
    p_city,
    p_deadline,
    p_notes,
    p_items
  );

  select request_number into v_number
  from public.quote_requests
  where id=v_id;

  return jsonb_build_object('id',v_id,'request_number',v_number);
end;
$$;

grant execute on function public.create_quote_request_v2(text,text,text,text,text,text,date,text,jsonb)
to anon, authenticated;
