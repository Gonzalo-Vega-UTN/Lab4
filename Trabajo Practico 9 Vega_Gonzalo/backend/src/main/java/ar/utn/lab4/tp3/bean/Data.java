package ar.utn.lab4.tp3.bean;

import ar.utn.lab4.tp3.model.CategoriaInstrumento;
import ar.utn.lab4.tp3.model.Instrumento;
import ar.utn.lab4.tp3.model.MyUser;
import ar.utn.lab4.tp3.service.impl.CategoriaServiceImpl;
import ar.utn.lab4.tp3.service.impl.InstrumentoServiceImpl;
import ar.utn.lab4.tp3.service.impl.UserServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class Data {


    @Autowired
    private InstrumentoServiceImpl instrumentoService;
    @Autowired
    private CategoriaServiceImpl categoriaService;

    @Autowired
    private UserServiceImpl userService;


    public void populateCategoriast() throws IOException {
        InputStream inputStream = Data.class.getResourceAsStream("/categorias.json");
        if (inputStream == null) {
            throw new IOException("categorias.json not found!");
        }
        ObjectMapper objectMapper = new ObjectMapper();
        List<CategoriaInstrumento> dataList = objectMapper.readValue(inputStream,
                objectMapper.getTypeFactory().constructCollectionType(List.class, CategoriaInstrumento.class));
        categoriaService.saveAll(dataList);
        populateDataOnStart();
    }
    public void populateDataOnStart() throws IOException {
        InputStream inputStream = Data.class.getResourceAsStream("/data.json");
        if (inputStream == null) {
            throw new IOException("data.json not found!");
        }
        ObjectMapper objectMapper = new ObjectMapper();
        List<Instrumento> dataList = objectMapper.readValue(inputStream,
                objectMapper.getTypeFactory().constructCollectionType(List.class, Instrumento.class));
        instrumentoService.saveAll(dataList);

        populateUsers();
    }

    public void populateUsers() throws IOException {
        InputStream inputStream = Data.class.getResourceAsStream("/users.json");
        if (inputStream == null) {
            throw new IOException("users.json not found!");
        }
        ObjectMapper objectMapper = new ObjectMapper();
        List<MyUser> dataList = objectMapper.readValue(inputStream,
                objectMapper.getTypeFactory().constructCollectionType(List.class, MyUser.class));
        userService.saveAll(dataList);
    }


}

