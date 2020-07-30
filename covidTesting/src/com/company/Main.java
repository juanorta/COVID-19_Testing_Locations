package com.company;

import java.sql.*;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.Html;
import com.gargoylesoftware.htmlunit.html.HtmlButton;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.gargoylesoftware.htmlunit.javascript.SilentJavaScriptErrorListener;
import org.apache.commons.logging.LogFactory;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.swing.plaf.nimbus.State;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

public class Main {
    public static void main(String[] args) throws IOException {

        String jdbcURL = "jdbc:mysql://covid.crn8sokbxdw9.us-east-2.rds.amazonaws.com/covid19?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
        String uname = "root";
        String pass = "diegito1";
        int testID;
        String state;
        String facility;
        String address;
        String city;
        String facilityType;
        String phoneNumber;
        String eligibility;
        String link;
        String query = "insert into test_locations values (?,?,?,?,?,?,?,?,?)";
        String querySelect = "select * from test_sites";

        String url = "https://datawrapper.dwcdn.net/H7PJn/56/";
        WebClient webClient = new WebClient(BrowserVersion.FIREFOX);

        webClient.getOptions().setJavaScriptEnabled(true); // enable javascript
        webClient.getOptions().setThrowExceptionOnScriptError(false); //even if there is error in js continue
        webClient.getOptions().setCssEnabled(false);
        webClient.waitForBackgroundJavaScript(5000); // important! wait when javascript finishes rendering

        //initializing array list and testSite object
        ArrayList<Item> testLocationsList = new ArrayList<Item>();
        Item testSite = new Item(0, "", "", "", "", "", "", "", "");

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(jdbcURL, uname, pass);
            PreparedStatement statement = connection.prepareStatement(query);
            String test_sites_table;

            //accessing page and button
            HtmlPage page = webClient.getPage(url);
            HtmlButton button = (HtmlButton) page.getByXPath("//button[@class='next svelte-1yl7n8i']").get(0);
            int siteID = 0;

            //loops through every page then clicks 'next' arrow
            for (int i = 1; i <= 187; i++) {

                //passing JS-rendered page to JSOUP
                String pageAsXml = page.asXml();
                Document document = Jsoup.parse(pageAsXml, url);

                //storing table, rows, and table data as variables to use later
                Element table = document.select("table").get(1);
                Elements rows = table.select("tr");
                Elements data = rows.select("td");
                System.out.println("Page " + i);

                //creating list of table rows of tyoe HtmlElement
                List<HtmlElement> items = page.getByXPath("//tr[@class='css-kfswhc svelte-fugjkr']");

                //looping through each row in table
                for (HtmlElement htmlItem : items) {

                    int l = htmlItem.getIndex() + 1;

                    //getting each type of data from each row
                    HtmlElement itemState = ((HtmlElement) htmlItem.getFirstByXPath(".//td[@class='type-text svelte-fugjkr first-mobile first-desktop dw-bold']"));
                    HtmlElement itemFacility = ((HtmlElement) htmlItem.getFirstByXPath(".//td[@class='type-text svelte-fugjkr']"));
                    HtmlElement itemAddress = ((HtmlElement) htmlItem.querySelector("#chart > div.table-scroll.svelte-fugjkr > table > tbody > tr:nth-child(" + l + ") > td:nth-child(" + 3 + ")"));
                    HtmlElement itemCity = ((HtmlElement) htmlItem.querySelector("#chart > div.table-scroll.svelte-fugjkr > table > tbody > tr:nth-child(" + l + ") > td:nth-child(" + 4 + ")"));
                    HtmlElement itemFacilityType = ((HtmlElement) htmlItem.querySelector("#chart > div.table-scroll.svelte-fugjkr > table > tbody > tr:nth-child(" + l + ") > td:nth-child(" + 5 + ")"));
                    HtmlElement itemPhoneNumber = ((HtmlElement) htmlItem.querySelector("#chart > div.table-scroll.svelte-fugjkr > table > tbody > tr:nth-child(" + l + ") > td:nth-child(" + 7 + ")"));
                    HtmlElement itemEligibility = ((HtmlElement) htmlItem.querySelector("#chart > div.table-scroll.svelte-fugjkr > table > tbody > tr:nth-child(" + l + ") > td:nth-child(" + 8 + ")"));
                    HtmlElement itemLink = ((HtmlElement) htmlItem.querySelector("#chart > div.table-scroll.svelte-fugjkr > table > tbody > tr:nth-child(" + l + ") > td:nth-child(" + 9 + ")"));
                    siteID++;

                    //storing scraped data in testSite object
                    testSite.setID(siteID);
                    testSite.setState(itemState.asText());
                    testSite.setFacility(itemFacility.asText());
                    testSite.setAddress(itemAddress.asText());
                    testSite.setCity(itemCity.asText());
                    testSite.setFacilityType(itemFacilityType.asText());
                    testSite.setPhoneNumber(itemPhoneNumber.asText());
                    testSite.setEligibility(itemEligibility.asText());
                    testSite.setLink(itemLink.asText());


                    testID = testSite.getId();
                    state = testSite.getState();
                    facility = testSite.getFacility();
                    address = testSite.getAddress();
                    city = testSite.getCity();
                    facilityType = testSite.getFacilityType();
                    phoneNumber = testSite.getPhoneNumber();
                    eligibility = testSite.getEligibility();
                    link = testSite.getLink();

                    //inserting into database
                    statement.setInt(1, testID);
                    statement.setString(2, state);
                    statement.setString(3, facility);
                    statement.setString(4, address);
                    statement.setString(5, city);
                    statement.setString(6, facilityType);
                    statement.setString(7, phoneNumber);
                    statement.setString(8, eligibility);
                    statement.setString(9, link);
                    statement.executeUpdate();
                }


                button.click();
                webClient.waitForBackgroundJavaScript(250);
            }
            statement.close();
            connection.close();

        } catch (
                Exception ex) {
            ex.printStackTrace();
        }


    }

    private static Object get(Object object, String field) throws NoSuchFieldException, IllegalAccessException {
        Field f = object.getClass().getDeclaredField(field);
        f.setAccessible(true);
        return f.get(object);
    }
}
