import React from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { connect } from "react-redux";
import { addCategory } from "../Containers/actions";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.buttonPress = this.buttonPress.bind(this);

    this.state = {
      categoryName: "",
      categoryDesc: "",
      categories: [],
      
    };
  }

  categorySubmitHandler = () => {
    if (
      this.state.categoryName.trim() === "" ||
      this.state.categoryDesc.trim() === ""
    ) {
      alert("Please fill the required data");

      return;
    }
    this.props.add(this.state.categoryName, this.state.categoryDesc);
  };

  categoryNameChangeHandler = (value) => {
    this.setState({
      categoryName: value,
    });
  };

  categoryDescChangeHandler = (value) => {
    this.setState({
      categoryDesc: value,
    });
  };

  buttonPress(navigation, id) {
    // FavouriteStore.cleanData();

    //FavouriteStore.fetchData();

    this.props.navigation.navigate("Movies", { Id: id });
  }

  renderFooter = () => {
    return (
      <View>
        <ActivityIndicator style={{ height: 80 }} color="#C00" size="large" />
      </View>
    );
  };

  GetGridViewItem(item) {
    Alert.alert(item);
  }
  updateSearch = (query) => {
    console.log("search");

    this.setState({ search: query });

    //   PlayStore.playLists.search = query

    //  MovieStore.setupData(this.state.search);
  };
  render() {
    // This will render the Home PlayList
    const { search } = this.state;

    return (
      <View>
        <View style={styles.container}>
          <View style={styles.inputView}>
            <View style={styles.inputTextContainer}>
              <Image
                style={styles.InputTextIcon}
                source={require("../Assets/input_text_icon.png")}
              />
              <TextInput
                style={styles.inputText}
                placeholder="Category Name"
                value={this.state.categoryName}
                placeholderTextColor="#003f5c"
                onChangeText={this.categoryNameChangeHandler}
              />
            </View>
            <View style={styles.inputTextContainer}>
              <Image
                style={styles.InputTextIcon}
                source={require("../Assets/input_text_icon.png")}
              />

              <TextInput
                style={styles.inputText}
                placeholder="Category Description"
                value={this.state.categoryDesc}
                placeholderTextColor="#003f5c"
                onChangeText={this.categoryDescChangeHandler}
              />
            </View>

            <TouchableOpacity onPress={this.categorySubmitHandler}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.create}>Create</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={this.props.categories}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={100}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.GridViewContainer}
              onPress={() => this.buttonPress(this.props.navigation, item.id)}
            >
              <View style={styles.GridViewContainer}>
                <View style={styles.ImageCellContainer}>
                  <Image
                    style={styles.ImageCell}
                    source={require("../Assets/categories.png")}
                  />
                </View>

                <Text style={styles.GridViewTextName}> {item.name} </Text>
                <Text style={styles.GridViewTextDescription}>
                  {" "}
                  {item.desc}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    );
  }

  loadMore = () => {
    // PlayStore.fetchData();
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 210,
    marginBottom: 20,
    marginTop: 20,
    padding: 20,
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5, // <- Radius of the shadow
    borderRadius: 5,
    padding: 16,
    margin: 8,
  },
  inputTextContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 10,
  },
  inputText: {
    flex: 1,
    height: 50,
  },
  create: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: "#1b95e0",
    color: "#fff",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "skyblue",
    fontWeight: "bold",
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
    alignItems: "center",
    height: 270,
    margin: 0,
    backgroundColor: "#fff",
  },
  GridViewTextName: {
    fontSize: 17,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "left",
    marginLeft: "-70%",
    padding: 0,
    overflow: "hidden",
  },
  GridViewTextDescription: {
    fontSize: 17,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "left",
    color: "#1b95e0",
    marginLeft: "-70%",
    padding: 0,
    overflow: "hidden",
  },

  InputTextIcon: {
    width: 20,
    height: 20,
    marginTop: 15,
    marginRight: 5,
  },
  ImageCellContainer: {
    width: "100%",
    height: 205,
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5, // <- Radius of the shadow
    borderRadius: 5,
    padding: 0,
    margin: 8,
  },
  ImageCell: {
    width: "100%",
    height: 205,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (name, desc) => {
      dispatch(addCategory(name, desc));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
