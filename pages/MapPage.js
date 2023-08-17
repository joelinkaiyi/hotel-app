import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import mapPin from "../assets/mapPin.png";

export default function MapPage(props) {
  const [location, setLocation] = useState({
    coords: {
      latitude: 25.05,
      longitude: 121.1,
      latitudeDelta: 0.4534989599034844,
      longitudeDelta: 0.3134926256882409,
    },
  });

  const [allmarkers, setAllmarkers] = useState([]);

  useEffect(() => {
    console.log("取得資訊map");
    getData();
  }, []);

  const getData = function (inputdata) {
    const REQUEST_URL =
      "https://media.taiwan.net.tw/XMLReleaseALL_public/hotel_C_f.json";
    fetch(REQUEST_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputdata),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("回傳資訊map");
        restaurantMakers(responseData.XML_Head.Infos.Info);
      })
      .catch((error) => {})
      .finally(() => {});
  };

  const restaurantMakers = function (listdata) {
    var markers = [];
    if (listdata) {
      for (var i = 0; i < listdata.length; i++) {
        if (i > 1000) {
          break;
        }
        let item = listdata[i];
        var marker = (
          <Marker
            coordinate={{
              latitude: parseFloat(item.Py), // Replace with the correct property name
              longitude: parseFloat(item.Px), // Replace with the correct property name
            }}
            title={item.Name}
            key={item.Id}
            description={item.Description}
            onPress={() => {
              console.log("找到民宿囉");
            }}
          >
            <Image source={mapPin} style={{ height: 60, width: 33 }} />
          </Marker>
        );
        markers.push(marker);
      }
    }
    setAllmarkers(markers);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: location.coords.latitudeDelta,
          longitudeDelta: location.coords.longitudeDelta,
        }}
      >
        {allmarkers.map((marker) => marker)}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
