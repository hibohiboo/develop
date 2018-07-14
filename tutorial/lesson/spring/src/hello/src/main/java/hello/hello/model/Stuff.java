package hello.hello.model;

import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

// import javax.persistence.Version;

// import org.hibernate.validator.constraints.NotEmpty;

@Table(name="stuff")
@Entity
public class Stuff {

  @Id 
  @Column(name="emp_id")
  private long id;

  @Column(name="stuff_name")
  private String name;

  public void setId(long id){
    this.id = id;
  }
  public long getId(){
    return this.id;
  }

  public void setName(String  name){
    this.name = name;
  }

  public String getName(){
    return this.name;
  }
}