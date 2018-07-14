package hello.hello;

import java.util.Optional;
import java.util.Collections;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hello.hello.model.Stuff;
// import hello.hello.repository.StuffRepository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
@SpringBootApplication
@RestController
public class HelloApplication {
  // @Autowired StuffRepository repository;

  @PersistenceContext
  private EntityManager entityManager;

  @RequestMapping("/")
  public String home() {
      return "Hello World from Docker";
  }
  @RequestMapping("/stuff")
  public String stuff() {
      // Optional<Stuff> optional =  repository.findByEmpId(1);
      // Stuff stuff = optional.orElse(null);
      String name = "";
      // if(stuff != null){
      //   name = stuff.stuff_name;
      // }
      return "Hello" + name;
  }

  @RequestMapping("/query")
  public String query() {
      List<Stuff> results = entityManager
            .createNativeQuery("select * from stuff where emp_id = :id", Stuff.class)
            .setParameter(":id",1)
            .getResultList();
      String name = results.get(0).getName();
      return "Hello" + name;
  }
	public static void main(String[] args) {
		SpringApplication.run(HelloApplication.class, args);
	}
}
