module Card.InputModel exposing (Item, Model, decoder, encode, initialModel)

import Json.Decode as D
import Json.Encode as E


type alias Item =
    String


type alias Model =
    { title : Item
    , mission : Item
    , shock : Item
    , secret : Item
    }


initialModel : Model
initialModel =
    { title = ""
    , mission = ""
    , shock = ""
    , secret = ""
    }


encode : Model -> E.Value
encode m =
    E.object
        [ ( "title", E.string m.title )
        , ( "mission", E.string m.mission )
        , ( "shock", E.string m.shock )
        , ( "secret", E.string m.secret )
        ]


decoder : D.Decoder Model
decoder =
    D.map4 Model
        (D.field "title" D.string)
        (D.field "mission" D.string)
        (D.field "shock" D.string)
        (D.field "secret" D.string)
