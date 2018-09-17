port module Main exposing (main)

import Browser
import Card.HandoutList as HandoutList
import Card.InputModel
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Decode



-- In ports


port fromJs : (String -> msg) -> Sub msg


main : Program Int Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.batch [ fromJs FromJs ]
        }



-- model


type alias Model =
    { inputModel : Card.InputModel.Model
    , handoutListModel : HandoutList.Model
    }


initialModel : Model
initialModel =
    { inputModel = Card.InputModel.initialModel
    , handoutListModel = HandoutList.initialModel
    }


init : Int -> ( Model, Cmd Msg )
init flags =
    ( initialModel, Cmd.none )


type Msg
    = HandoutListMsg HandoutList.Msg
    | FromJs String



-- update


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        HandoutListMsg subMsg ->
            let
                ( updatedHandoutListModel, handoutListCmd ) =
                    HandoutList.update subMsg model.inputModel.title model.handoutListModel
            in
            ( { model | handoutListModel = updatedHandoutListModel }, Cmd.map HandoutListMsg handoutListCmd )

        FromJs json ->
            let
                r =
                    Json.Decode.decodeString Card.InputModel.decoder json

                -- decodeに成功したら、InputModelを。失敗したら元の値を返す。
                im =
                    case r of
                        Ok m ->
                            m

                        Err _ ->
                            model.inputModel
            in
            ( { model | inputModel = im }, Cmd.none )



-- subscription


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- view


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ Html.map HandoutListMsg (HandoutList.view model.handoutListModel)
        ]
