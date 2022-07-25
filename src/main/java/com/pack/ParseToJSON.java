package com.pack;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

public class ParseToJSON {

	public static void main(String[] args) throws Exception {
	       
		    File input = new File("C:/Users/donga/eclipse-workspace/D3/src/main/webapp/sales_data.csv");
	        File output = new File("C:/Users/donga/eclipse-workspace/D3/src/main/webapp/salesData.json");

	        List<Map<?, ?>> data = readObjectsFromCsv(input);
	        writeAsJson(data, output);
	        System.out.println("Parsing done");
	    }

	    public static List<Map<?, ?>> readObjectsFromCsv(File file) throws IOException {
	        CsvSchema bootstrap = CsvSchema.emptySchema().withHeader();
	        CsvMapper csvMapper = new CsvMapper();
	        try (MappingIterator<Map<?, ?>> mappingIterator = csvMapper.readerFor(Map.class).with(bootstrap).readValues(file)) {
	            return mappingIterator.readAll();
	        }
	    }

	    public static void writeAsJson(List<Map<?, ?>> data, File file) throws IOException {
	        ObjectMapper mapper = new ObjectMapper();
	         mapper.writerWithDefaultPrettyPrinter().writeValue(file, data);
	       
	    }
}
