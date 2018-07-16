create trigger trg_emp_id
      before insert on staff
      for each row
    begin
      select emp_id_seq.nextval
        into :new.emp_id
        from dual;
    end;
/