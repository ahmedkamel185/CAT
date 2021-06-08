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
import {
  addMovie,
  deleteMovie,
  updateMovie,
} from "../Containers/actions";
import { Rating, AirbnbRating } from "react-native-ratings";
import Dialog, { DialogContent } from "react-native-popup-dialog";

class Movies extends React.Component {
  // State Initialization
  constructor(props) {
    super(props);
    this.buttonPress = this.buttonPress.bind(this);
    this.state = {
      Name: "",
      Desc: "",
      Rate: null,
      itemName: "",
      itemRate: null,
      itemDesc: "",
      itemId: null,
      value: null,
      movies: this.props.movies,
    };
  }

  movieSubmitHandler = () => {
    if (this.state.Name.trim() === "" || this.state.Desc.trim() === "") {
      alert("Please fill the required data");

      return;
    }

    this.props.add(
      this.props.route.params.Id,
      this.state.Name,
      this.state.Rate,
      this.state.Desc
    );
  };

  movieUpdateHandler = () => {
    this.props.Update(
      this.state.itemId,
      this.state.itemName,
      this.state.itemRate,
      this.state.itemDesc
    );

    this.setState({ visible: false });
  };

  movieDeletionHandler = (id) => {
    this.props.delete(id);
  };

  movieNameChangeHandler = (value) => {
    this.setState({
      Name: value,
    });
  };

  movieRateChangeHandler = (value) => {
    this.setState({
      Rate: value.replace(/[^0-9]/g, ""),
    });
  };

  movieDescChangeHandler = (value) => {
    this.setState({
      Desc: value,
    });
  };

  movieItemNameChangeHandler = (value) => {
    this.setState({
      itemName: value,
    });
  };

  movieItemRateChangeHandler = (value) => {
    this.setState({
      itemRate: value,
    });
  };


  onPressItem = (item) => {
    this.setState({
      visible: true,
      itemId: item.id,
      itemName: item.name,
      itemRate: item.rate,
      itemDesc: item.desc,
    });
  };

  movieItemDescChangeHandler = (value) => {
    this.setState({
      itemDesc: value,
    });
  };

  buttonPress(navigation, id) {
    alert(this.props.route.params.Id);
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

  render() {
    // This will render the Home PlayList
    var id = this.props.route.params.Id;

    //  alert(id)
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
                placeholder="Movie Name"
                value={this.state.Name}
                placeholderTextColor="#003f5c"
                onChangeText={this.movieNameChangeHandler}
              />
            </View>

            <View style={styles.inputTextContainer}>
              <Image
                style={styles.InputTextIcon}
                source={require("../Assets/input_text_icon.png")}
              />

              <TextInput
                style={styles.inputText}
                placeholder="Movie Rate"
                value={this.state.Rate}
                placeholderTextColor="#003f5c"
                onChangeText={this.movieRateChangeHandler}
              />
            </View>

            <View style={styles.inputTextContainer}>
              <Image
                style={styles.InputTextIcon}
                source={require("../Assets/input_text_icon.png")}
              />

              <TextInput
                style={styles.inputText}
                placeholder="Movie Description"
                value={this.state.Desc}
                placeholderTextColor="#003f5c"
                onChangeText={this.movieDescChangeHandler}
              />
            </View>

            <TouchableOpacity onPress={this.movieSubmitHandler}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.create}>Create</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={this.props.movies.filter(function (item) {
            return item.category_id === id;
          })}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => this.loadMore()}
          onEndReachedThreshold={100}
          renderItem={({ item }) => (
            <View style={styles.GridViewContainer}>
              <View style={styles.ContainerCell}>
                <Image
                  style={styles.ImageCell}
                  source={require("../Assets/categories.png")}
                />

                <View style={styles.HorizontalContainer}>
                  <Text style={styles.GridViewTextTitle}> {item.name} </Text>
                  <Text style={styles.GridViewTextDescription}>
                    {" "}
                    {item.desc}{" "}
                  </Text>
                  <View style={styles.EditDeleteRatingContainer}>
                    <Rating
                      style={styles.Rating}
                      readonly={true}
                      count={5}
                      imageSize={15}
                      startingValue={item.rate}
                    />

                    <View style = {styles.EditDeleteContainer}>
                      <TouchableOpacity
                        onPress={() => this.onPressItem(item)}
                        style={{ zIndex: -2 }}
                      >
                        <Text style={styles.Edit}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => this.movieDeletionHandler(item.id)}
                        style={styles.Delete}
                      >
                        <Text style={styles.Delete}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                    <Dialog
                      visible={this.state.visible}
                      onTouchOutside={() => {
                        this.setState({ visible: false });
                      }}
                    >
                      <DialogContent>
                        <View style={styles.inputView,{width:200}} >
                          <View style={styles.inputTextContainer}>
                            <Image
                              style={styles.InputTextIcon}
                              source={require("../Assets/input_text_icon.png")}
                            />
                            <TextInput
                              style={styles.inputText}
                              placeholder="Name"
                              value={this.state.itemName}
                              placeholderTextColor="#003f5c"
                              onChangeText={this.movieItemNameChangeHandler}
                            />
                          </View>
                          <View style={styles.inputTextContainer}>
              <Image
                style={styles.InputTextIcon}
                source={require("../Assets/input_text_icon.png")}
              />

              <TextInput
                style={styles.inputText}
                placeholder="Movie Rate"
                value={this.state.itemRate}
                placeholderTextColor="#003f5c"
                onChangeText={this.movieItemRateChangeHandler}
              />
            </View>

                          <View style={styles.inputTextContainer}>
                            <Image
                              style={styles.InputTextIcon}
                              source={require("../Assets/input_text_icon.png")}
                            />

                            <TextInput
                              style={styles.inputText}
                              placeholder="Description"
                              placeholderTextColor="#003f5c"
                              value={this.state.itemDesc}
                              onChangeText={this.movieItemDescChangeHandler}
                            />
                          </View>

                          <TouchableOpacity onPress={this.movieUpdateHandler}>
                            <View
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={styles.create}>Update</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </DialogContent>
                    </Dialog>
                  </View>
                </View>
              </View>
            </View>
          )}
          numColumns={1}
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
    height:310,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 280,
    marginBottom: 40,
    marginTop: 40,
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5, // <- Radius of the shadow
    borderRadius: 5,
    paddingBottom: 0,
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
    marginBottom: 45,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  Delete: {
    zIndex: -1,
    fontSize: 12,
    fontWeight: "200",
    backgroundColor: "#fff",
    color: "darkred",
    padding: 0,
    marginTop: -1,
    width: 40,
    height: 20,
    borderWidth: 0,
    borderColor: "#fff",
    marginRight: "-60%",
  },
  Edit: {
    zIndex: -1,
    fontSize: 12,
    fontWeight: "200",
    backgroundColor: "#fff",
    color: "blue",
    padding: 0,
    marginTop: -2,
    width: 40,
    height: 20,
    borderWidth: 0,
    borderColor: "#fff",
    marginRight: "0%",
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
    width: "100%",
    marginTop: 25,
    alignItems: "center",
    height: 230,
    margin: 0,
    padding: 0,
    backgroundColor: "#fff",
  },
  GridViewTextTitle: {
    zIndex: 1,
    fontSize: 18,
    marginLeft: 5,
    marginTop: 15,
    paddingBottom: 2,
    marginBottom: 0,
    fontWeight: "bold",
    justifyContent: "center",
    overflow: "hidden",
  },

  GridViewTextDescription: {
    zIndex: 2,
    width: 140,
    height: "50%",
    fontSize: 12,
    marginLeft: 10,
    color: "#BEBEBE",
    marginTop: 0,
    paddingTop: -110,
    overflow: "hidden",
  },
  Rating: {
    zIndex: 2,
    fontSize: 12,
    marginLeft: 10,
    marginRight: "1.4%",
    marginTop: 0,
    paddingTop: -110,
    overflow: "hidden",
  },

  InputTextIcon: {
    width: 20,
    height: 20,
    marginTop: 15,
    marginRight: 5,
  },
  ContainerCell: {
    flexDirection: "row",
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 1,
  },
  EditDeleteRatingContainer: {
    flexDirection: "row",
    width: "100%",
    height: "18%",
  },

  EditDeleteContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "18%",
    marginRight: -20,
    justifyContent: 'flex-end'
  },


  ImageCell: {
    width: "30%",
    height: "70%",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 18,
    marginLeft: 10.2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
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
});

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (id) => {
      dispatch(deleteMovie(id));
    },
    add: (id, name, rate, desc) => {
      dispatch(addMovie(id, name, rate, desc));
    },
    Update: (id, name, rate, desc) => {
      dispatch(updateMovie(id, name, rate, desc));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
