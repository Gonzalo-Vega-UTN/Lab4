package ar.utn.lab4.tp3.service.impl;

import ar.utn.lab4.tp3.model.Instrumento;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class JsonService {
    @Autowired
    private ObjectMapper objectMapper;

    public List<Instrumento> parseJsonData(String filePath) throws IOException {
        File jsonFile = new File(filePath);
        List<Instrumento> dataList =
                objectMapper.readValue(jsonFile, objectMapper.getTypeFactory()
                        .constructCollectionType(List.class, Instrumento.class));
        return dataList;
    }
}
