package com.company;

public class Item {
    private int id;
    private String state;
    private String facility;
    private String address;
    private String city;
    private String facilityType;
    private String phoneNumber;
    private String eligibility;
    private String link;

    Item(int id, String state, String facility, String address, String city, String facilityType, String phoneNumber, String eligibility, String link) {
        this.id = id;
        this.state = state;
        this.facility = facility;
        this.address = address;
        this.city = city;
        this.facilityType = facilityType;
        this.phoneNumber = phoneNumber;
        this.eligibility = eligibility;
        this.link = link;
    }

    @Override
    public String toString() {
        return ("id: " + this.getId() +
                "state: " + this.getState() +
                "facility: " + this.getFacility() +
                "address : " + this.getAddress() +
                "city: " + this.getCity() +
                "facilityType: " + this.getFacilityType() +
                "phoneNumber: " + this.getPhoneNumber() +
                "eligibility: " + this.getEligibility() +
                "link: " + this.getLink()
        );
    }

    public void setID(int id) {
        this.id = id;
    }

    public int getId() {
        return this.id;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return this.state;
    }

    public void setFacility(String facility) {
        this.facility = facility;
    }

    public String getFacility() {
        return this.facility;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddress() {
        return this.address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCity() {
        return this.city;
    }

    public void setFacilityType(String facilityType) {
        this.facilityType = facilityType;
    }

    public String getFacilityType() {
        return this.facilityType;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }

    public String getEligibility() {
        return this.eligibility;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getLink() {
        return this.link;
    }
}
