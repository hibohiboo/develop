port module Card.InputModel exposing (Item, Model, initialModel)


type alias Item =
    String


type alias Model =
    { inputStr : Item
    }


initialModel : Model
initialModel =
    { inputStr = ""
    }
