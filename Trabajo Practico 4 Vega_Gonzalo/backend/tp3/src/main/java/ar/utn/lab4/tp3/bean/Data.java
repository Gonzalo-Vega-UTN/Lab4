package ar.utn.lab4.tp3.bean;

import ar.utn.lab4.tp3.model.Instrumento;
import ar.utn.lab4.tp3.service.InstrumentoServiceImpl;
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
    private InstrumentoServiceImpl service;

    @PostConstruct
    public void populateDataOnStart() throws IOException {
        InputStream inputStream = Data.class.getResourceAsStream("/data.json");
        if (inputStream == null) {
            throw new IOException("data.json not found!");
        }
        ObjectMapper objectMapper = new ObjectMapper();
        List<Instrumento> dataList = objectMapper.readValue(inputStream,
                objectMapper.getTypeFactory().constructCollectionType(List.class, Instrumento.class));
        service.saveAll(dataList);
    }
}

