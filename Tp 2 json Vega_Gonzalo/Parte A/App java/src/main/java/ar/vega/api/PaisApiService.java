package ar.vega.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class PaisApiService {
    public String getData(int codigoPais){
        try {
            URL url = new URL("https://restcountries.com/v2/callingcode/"+codigoPais);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            // Response code
            if(connection.getResponseCode() != 200) {
                return null;
            }
            // Obtener String de datos
            BufferedReader streamDatos = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String inputLine;

            while ((inputLine = streamDatos.readLine()) != null) {
                response.append(inputLine);
            }
            //Se cierran recursos
            streamDatos.close();
            connection.disconnect();
            System.out.println(response.toString());
            return response.toString(); //string de datos json

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
