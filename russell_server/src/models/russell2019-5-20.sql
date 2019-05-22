-- 点击量默认值设为1
alter table blg_article alter column click_count set default 1;
-- 旧数据点击量全设为1
update blg_article set click_count = 1;
