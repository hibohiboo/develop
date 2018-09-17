module Card.InputModel exposing (Item, Model, decoder, encode, initialModel)

import Json.Decode as D
import Json.Encode as E


type alias Item =
    String


type alias Model =
    { title : Item
    }


initialModel : Model
initialModel =
    { title = ""
    }


encode : Model -> E.Value
encode m =
    E.object
        [ ( "title", E.string m.title )
        ]


decoder : D.Decoder Model
decoder =
    D.map Model
        (D.field "title" D.string)
