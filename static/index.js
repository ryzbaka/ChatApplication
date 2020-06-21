const colors = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    /*"LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",*/
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    //"SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    //"White",
    //"WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];
  function addMessageToClient(message) {
    const messageHolder = document.querySelector(".message-holder");
    const messageTile = document.createElement("div");
    const messageText = document.createElement("p");
    messageText.innerText = message.user_name + " : " + message.message;
    messageText.style.color = "white";
    messageTile.style.backgroundColor = message.user_color;
    messageTile.style.width="50%"
    console.log(messageTile)
    console.log(message.tileColor)
    messageTile.appendChild(messageText);
    messageHolder.appendChild(messageTile);
  }
  const socket = io.connect(
    "http://" + document.domain + ":" + location.port
  );
  const tileColor=colors[_.random(lower=0, upper=colors.length,false)];
  socket.on("connect", () => {
    socket.emit("my event", {
      data: "User Connected", //json object being fed into 'my event'
    }); //triggered "my event", terminal should show 'User Connected.'

    const form = document.querySelector(".infoForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const user_name = form.elements[0].value;
      form.elements[0].disabled = true;
      const user_input = form.elements[1].value;
      //const tileColor=colors[_.random(lower=0, upper=colors.length,false)];
      if (
        user_name !== undefined &&
        user_input !== undefined &&
        user_name.length > 0 &&
        user_input.length > 0
      ) {
        socket.emit("my event", {
          user_name: user_name,
          message: user_input,
          user_color:tileColor
        });
      }
      form.elements[1].value = "";
    });
    socket.on("my response", (message) => {
      //when the server receives a json object containing
      //the username and the message, the server triggers a 'my response' event which then tell client side to add
      //the username and message to the clientside
      console.log(message);
      if (
        message.user_name !== undefined &&
        message.message !== undefined
      ) {
        addMessageToClient(message);
      }
    });
  });
