import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import c4_address from "../assets/c4_address.png";

export default function ListPage() {
  const [Info, setInfo] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({
    Id: "C4_315080000H_000008",
    Name: "思源居民宿",
    Description: "位於南投縣的民宿",
    Grade: "",
    Add: "南投縣埔里鎮水頭里水頭路1號",
    Zipcode: "545",
    Region: "南投縣",
    Town: "埔里鎮",
    Tel: "886-49-2927101",
    Fax: "",
    Gov: "315080000H",
    Website: "",
    Picture1: "https://taiwan.taiwanstay.net.tw/twpic/15545.jpg",
    Picdescribe1: "外觀",
    Picture2: "",
    Picdescribe2: "",
    Picture3: "",
    Picdescribe3: "",
    Px: 120.970365,
    Py: 23.935199,
    Class: "4",
    Map: "",
    Spec: "",
    Serviceinfo: "自行車友善旅宿",
    Parkinginfo: "車位:小客車0輛、機車0輛、大客車0輛",
    TotalNumberofRooms: 3,
    LowestPrice: 2200,
    CeilingPrice: 3600,
    TaiwanHost: "0",
    IndustryEmail: "sss050021@yahoo.com.tw",
    TotalNumberofPeople: 10,
    AccessibilityRooms: 0,
    PublicToilets: null,
    LiftingEquipment: null,
    ParkingSpace: 0,
  });

  //取得餐廳資訊
  useEffect(() => {
    console.log("取得資訊list");
    getData();
  }, []); //一開始會執行一次

  const getData = function (inputdata) {
    //setapiData([]);
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
        console.log("回傳資訊list");
        setInfo(responseData.XML_Head.Infos.Info);
      })
      .catch((error) => {})
      .finally(() => {});
  };

  const pressDetail = function (item) {
    setmodalVisible(true);
    console.log("按我" + JSON.stringify(item));
    setSelectItem(item);
  };

  const DATA = [
    {
      Id: "C4_315080000H_000008",
      Name: "思源居民宿",
      Description: "位於南投縣的民宿",
      Grade: "",
      Add: "南投縣埔里鎮水頭里水頭路1號",
      Zipcode: "545",
      Region: "南投縣",
      Town: "埔里鎮",
      Tel: "886-49-2927101",
      Fax: "",
      Gov: "315080000H",
      Website: "",
      Picture1: "https://taiwan.taiwanstay.net.tw/twpic/15545.jpg",
      Picdescribe1: "外觀",
      Picture2: "",
      Picdescribe2: "",
      Picture3: "",
      Picdescribe3: "",
      Px: 120.970365,
      Py: 23.935199,
      Class: "4",
      Map: "",
      Spec: "",
      Serviceinfo: "自行車友善旅宿",
      Parkinginfo: "車位:小客車0輛、機車0輛、大客車0輛",
      TotalNumberofRooms: 3,
      LowestPrice: 2200,
      CeilingPrice: 3600,
      TaiwanHost: "0",
      IndustryEmail: "sss050021@yahoo.com.tw",
      TotalNumberofPeople: 10,
      AccessibilityRooms: 0,
      PublicToilets: null,
      LiftingEquipment: null,
      ParkingSpace: 0,
    },
  ];

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ url: item.Picture1 }} style={styles.itemImage} />
      <View style={styles.itemRightSide}>
        <Text style={styles.titleName}>{item.Name}</Text>
        <View style={styles.itemRightBottomArea}>
          <View style={styles.itemAddressArea}>
            <Image source={c4_address} style={styles.c4_address} />
            <Text style={styles.address}>{item.Add}</Text>
          </View>

          <TouchableOpacity onPress={() => pressDetail(item)}>
            <View style={styles.itemButton}>
              <Text style={styles.itemButtonText}>詳細</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.titleText}>民宿列表</Text>
      </View>
      <FlatList
        data={Info}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalName}>{selectItem.Name}</Text>
            <View style={styles.modalAddressArea}>
              <Image source={c4_address} style={styles.c4_address} />
              <Text style={styles.modalAdd}>{selectItem.Add}</Text>
            </View>
            <Image
              source={{ url: selectItem.Picture1 }}
              style={styles.modalImage}
            />

            <Text style={styles.modalDescription}>
              {selectItem.Description}
            </Text>
            <Text style={styles.modalTel}>電話：{selectItem.Tel}</Text>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setmodalVisible(false)}
            >
              <View style={styles.itemButton}>
                <Text style={styles.itemButtonText}>關閉</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "black",
    borderRadius: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    alignItems: "center",
  },
  topBar: {
    height: 60,
    backgroundColor: "#32B768",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  titleName: {
    fontSize: 20,
  },
  itemRightSide: {
    marginLeft: 20,
    justifyContent: "center",
    flexGrow: 1,
  },
  c4_address: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  itemRightBottomArea: {
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
  },
  address: {
    color: "#6B7280",
    fontSize: 13,
    width: 100,
  },
  itemButton: {
    backgroundColor: "#32B768",
    borderRadius: 8,
    alignItems: "center",
    width: 100,
  },
  itemButtonText: {
    color: "white",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  itemAddressArea: {
    flexGrow: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalAddressArea: {
    flexDirection: "row",
    marginVertical: 10,
  },
  modalName: {
    fontSize: 20,
  },
  modalAdd: {
    color: "#6B7280",
    fontSize: 13,
  },
  modalImage: {
    width: 250,
    height: 100,
    resizeMode: "cover",
    backgroundColor: "green",
    borderRadius: 10,
  },
  modalDescription: {
    marginVertical: 15,
    color: "#000000",
    fontSize: 14,
  },
  modalTel: {
    marginBottom: 10,
  },
  modalCancel: {
    alignSelf: "center",
  },
});
