package ar.vega;

import ar.vega.api.PaisApiService;
import ar.vega.model.Pais;
import ar.vega.service.PaisService;
import com.google.gson.*;
import org.h2.util.json.JSONObject;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        PaisApiService apiService = new PaisApiService();
        PaisService paisService = new PaisService();
        System.out.println("Inicio guardado de paises");
        for (int i = 0; i <= 300; i++) {
            System.out.println("Llamando al pais " +i);
            String jsonString = apiService.getData(i);
            if(jsonString == null) continue;
            List<Pais> paises = paisService.getPaises(jsonString);
            for (Pais p : paises)
                paisService.savePais(p);
        }
    }
}