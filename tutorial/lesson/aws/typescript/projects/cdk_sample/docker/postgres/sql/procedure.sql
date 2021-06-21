CREATE OR REPLACE PROCEDURE test1(num int)
AS $$
DECLARE
  str1 VARCHAR(20);
  num1 numeric(19,1);
  str_interval VARCHAR(20);
  tmp_interval interval;
  count_for_fifteen int = 24*4;
BEGIN
  FOR i IN 1..num LOOP
    FOR j IN 1..count_for_fifteen LOOP
	-- FM: 字詰めモード（戦闘の0および空白のパディング無効)
	  str1 := 'test_' || to_char(i, 'FM0000');
	  num1 := 15 * j;
	  str_interval := num1 || ' minutes';
	  tmp_interval := cast ( str_interval AS INTERVAL);
      insert into electric values (i, str1, to_timestamp('2010-01-01 23:00:00', 'YYYY-MM-DD HH24:MI:SS') + tmp_interval, 4 + j *100);
	END LOOP;
  END LOOP;
END;
$$
LANGUAGE plpgsql;
/
