#include <Arduino.h>
#include "DHT.h"
#include "WiFi.h"
#include <HTTPClient.h>
#include <U8g2lib.h>

#define DHTPIN 2
#define DHTTYPE DHT22
#define DELAY_IN_S 30
#define IS_OLED false

#define U8LOG_WIDTH 25
#define U8LOG_HEIGHT 8

U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);
// u8g2_uint_t offset;
// u8g2_uint_t width;

uint8_t u8log_buffer[U8LOG_WIDTH * U8LOG_HEIGHT];
U8G2LOG u8g2log;

DHT dht(DHTPIN, DHTTYPE);
HTTPClient http;

const char *ssid = "?YOUR WLAN NAME?";
const char *password = "?YOUR WLAN PASSWORD?";
const char *serverUrl = "https://hute.info/graphql";
const char *deviceId = "?DEVICE ID?";
const char *root_ca =
    "-----BEGIN CERTIFICATE-----\n"
    "MIIDSjCCAjKgAwIBAgIQRK+wgNajJ7qJMDmGLvhAazANBgkqhkiG9w0BAQUFADA/\n"
    "MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT\n"
    "DkRTVCBSb290IENBIFgzMB4XDTAwMDkzMDIxMTIxOVoXDTIxMDkzMDE0MDExNVow\n"
    "PzEkMCIGA1UEChMbRGlnaXRhbCBTaWduYXR1cmUgVHJ1c3QgQ28uMRcwFQYDVQQD\n"
    "Ew5EU1QgUm9vdCBDQSBYMzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\n"
    "AN+v6ZdQCINXtMxiZfaQguzH0yxrMMpb7NnDfcdAwRgUi+DoM3ZJKuM/IUmTrE4O\n"
    "rz5Iy2Xu/NMhD2XSKtkyj4zl93ewEnu1lcCJo6m67XMuegwGMoOifooUMM0RoOEq\n"
    "OLl5CjH9UL2AZd+3UWODyOKIYepLYYHsUmu5ouJLGiifSKOeDNoJjj4XLh7dIN9b\n"
    "xiqKqy69cK3FCxolkHRyxXtqqzTWMIn/5WgTe1QLyNau7Fqckh49ZLOMxt+/yUFw\n"
    "7BZy1SbsOFU5Q9D8/RhcQPGX69Wam40dutolucbY38EVAjqr2m7xPi71XAicPNaD\n"
    "aeQQmxkqtilX4+U9m5/wAl0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNV\n"
    "HQ8BAf8EBAMCAQYwHQYDVR0OBBYEFMSnsaR7LHH62+FLkHX/xBVghYkQMA0GCSqG\n"
    "SIb3DQEBBQUAA4IBAQCjGiybFwBcqR7uKGY3Or+Dxz9LwwmglSBd49lZRNI+DT69\n"
    "ikugdB/OEIKcdBodfpga3csTS7MgROSR6cz8faXbauX+5v3gTt23ADq1cEmv8uXr\n"
    "AvHRAosZy5Q6XkjEGB5YGV8eAlrwDPGxrancWYaLbumR9YbK+rlmM6pZW87ipxZz\n"
    "R8srzJmwN0jP41ZL9c8PDHIyh8bwRLtTcm1D9SZImlJnt1ir/md2cXjbDaJWFBM5\n"
    "JDGFoqgCWjBH4d1QB7wCCZAA62RjYJsWvIjJEubSfZGL+T0yjWW06XyxV3bqxbYo\n"
    "Ob8VZRzI9neWagqNdwvYkQsEjgfbKbYK7p2CNTUQ\n"
    "-----END CERTIFICATE-----\n";

void print(String text) {
  u8g2log.print(text);
  Serial.print(text);
}
void print(float text) {
  u8g2log.print(text);
  Serial.print(text);
}

void setup() {
  Serial.begin(9600);
  delay(10);
  u8g2.begin();
  u8g2.setFont(u8g2_font_5x7_tr);
  u8g2log.begin(u8g2, U8LOG_WIDTH, U8LOG_HEIGHT, u8log_buffer);
  u8g2log.setLineHeightOffset(0);
  u8g2log.setRedrawMode(1);

  print("------------------------- \n");
  
  esp_sleep_enable_timer_wakeup(DELAY_IN_S * 1e6);
  WiFi.begin(ssid, password);
  dht.begin();
  print("Setup completed! \n\n");
}

void loop() {
  delay(2000);

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if(isnan(humidity) || isnan(temperature)) {
    print(F("Failed to read from DHT sensor\n"));
  } else {
    print(F("Humidity: "));
    print(humidity);
    print(F("%\n"));
    print(F("Temperature: "));
    print(temperature);
    print(F("°C\n"));


    print("Connecting to: ");
    print(ssid);
    print("\n");

    while (WiFi.status() != WL_CONNECTED) {
      WiFi.begin(ssid, password);
      delay(1000);
      print(".");
    }
    print("WiFi connected! \n");
    print("IP address: \n");
    print(WiFi.localIP());
    print("\n");
    WiFi.mode(WIFI_STA);

    print("\n");

    print("Start request to: ");
    print(serverUrl);
    print("\n");
    http.begin(serverUrl);

    http.addHeader("Content-Type", "application/json");
    http.addHeader("Accept", "application/json");
    http.addHeader("Connection", "keep-alive");
    http.addHeader("Origin", "Origin: https://hute.info");

    char query [256]; // how do we know the buffer size we need?
    sprintf(query, "{\"query\":\"mutation {createRecord(deviceId: \\\"%s\\\" temperature: %.2f humidity: %.2f){time}}\"}", deviceId, temperature, humidity);

    print("\n");
    print("Query: \n");
    print(query);
    print("\n\n");

    int statusCode = http.POST(query);

    if (statusCode == HTTP_CODE_OK) {
      print("Request successfull!\n");
      String payload = http.getString();
      print(payload);
    } else {
      print("Cannot send data, status code:");
      print(statusCode);
    }

    http.end();
    WiFi.disconnect();
  }

  print("\n");
  print("=> SLEEP!\n");
  esp_deep_sleep_start();
}