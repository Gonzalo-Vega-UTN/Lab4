package ar.vega.service;

import ar.vega.api.PaisApiService;
import ar.vega.db.JPAUtil;
import ar.vega.model.Pais;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

public class PaisService {
    Gson gson = new Gson();


    public List<Pais> getPaises(String jsonString){
        // Parse JSON
        //Viene tipo [{"name":"Argentina","topLevelDomain":[".ar"],"alpha.....}] puede venir mas de un pais por callingCode
        JsonArray jsonArray = gson.fromJson(jsonString, JsonArray.class);
        List<Pais> paises = new ArrayList<>();
        for (JsonElement element : jsonArray) {
            try{
                JsonObject json = element.getAsJsonObject();
                String numericCodeStr = json.get("numericCode").toString().replace("\"","");
                String name = json.get("nativeName").toString().replace("\"","");
                String capital = json.get("capital") == null ? null : json.get("capital").toString().replace("\"","");
                String region = json.get("region").toString().replace("\"","");
                String population = json.get("population").toString().replace("\"","");
                String latitud = json.get("latlng").getAsJsonArray().get(0).toString().replace("\"","");
                String longitud = json.get("latlng").getAsJsonArray().get(1).toString().replace("\"","");
                Pais pais = new Pais(
                        Integer.valueOf(numericCodeStr),
                        name,
                        capital,
                        region,
                        Long.valueOf(population),
                        Double.valueOf(latitud),
                        Double.valueOf(longitud));
                paises.add(pais);

            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return paises;
    }

    public void savePais(Pais pais) {

        EntityManager em = JPAUtil.getEntityManager();
        try {
            em.getTransaction().begin();
            String query = "SELECT COUNT(*) FROM PAIS WHERE CODIGO_PAIS = :id";
            Query countQuery = em.createQuery(query);
            countQuery.setParameter("id", pais.getCodigoPais());
            Long count = (Long) countQuery.getSingleResult();

            if (count == 0) {
                em.persist(pais); // Realiza la inserción
            }else{
                System.out.println("AAAAA");
            }


            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }


}
