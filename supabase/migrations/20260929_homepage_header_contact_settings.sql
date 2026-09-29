insert into public.site_settings(key,value) values
('homepage_header','{"logoUrl":"","backgroundUrl":"","welcomeTitle":""}'::jsonb),
('homepage_contact','{"title":"","subtitle":"","backgroundUrl":"","messengerUrl":"","liveChatUrl":""}'::jsonb)
on conflict(key) do nothing;
