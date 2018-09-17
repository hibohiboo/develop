module Card.Handout exposing (Handout, Msg, insaneHandout, new, update)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


type alias Handout =
    { id : Int
    , title : String
    , mission : String
    , shock : String
    , secret : String
    , del : Bool
    }


type Msg
    = NoOp
    | OnDelete Int


update : Msg -> Handout -> Handout
update message model =
    case message of
        NoOp ->
            model

        OnDelete id ->
            if id == model.id then
                { model | del = True }

            else
                model


new : Int -> String -> String -> String -> String -> Handout
new i t m sh se =
    { id = i
    , title = t
    , mission = m
    , shock = sh
    , secret = se
    , del = False
    }


insaneHandout : Handout -> Html Msg
insaneHandout model =
    li []
        [ div [ class "insane-card card" ]
            [ div [ class "f1" ]
                [ open model.title model.mission
                ]
            , div [ class "f1" ]
                [ secret model.shock model.secret
                ]
            ]
        , viewDeleteButton model
        ]


viewDeleteButton : Handout -> Html Msg
viewDeleteButton ho =
    span [ class "deleteButton" ]
        [ button [ onClick (OnDelete ho.id) ] [ text "x" ]
        ]


secret sh se =
    div [ class "card black insane-wrapper", style "width" "190px", style "height" "300px" ]
        [ div [ class "card-title white-text", style "flex" "1", style "text-align" "center" ] [ text "Handout" ]
        , secretInnerCard sh se
        ]


secretInnerCard sh se =
    div
        [ class "card white"
        , style "display" "flex"
        , style "width" "180px"
        , style "height" "290px"
        , style "flex-direction" "column"
        , style "justify-content" "center"
        , style "align-items" "center"
        ]
        [ div
            [ class "card black"
            , style "width" "170px"
            , style "height" "280px"
            , style "margin-bottom" "0.5rem"
            ]
            [ div [ class "white-text font-s", style "flex" "1", style "text-align" "center" ] [ text "秘密" ]
            , secretInnerWrapper sh se
            , div [ class "white-text font-s insane-secret-footer" ] [ text "この秘密を自分から明らかに" ]
            , div [ class "white-text font-s insane-secret-footer" ] [ text "することはできない" ]
            ]
        ]


secretInnerWrapper sh se =
    div [ class "insane-wrapper" ]
        [ secretMain sh se
        ]


secretMain sh se =
    div
        [ class "card white"
        , style "width" "160px"
        , style "height" "180px"
        , style "margin" "1px"
        ]
        [ secretShock sh
        , secretContent se
        ]


secretShock shock =
    div
        [ class "row font-m"
        , style "border-bottom" "3px double #bbb"
        , style "margin-bottom" "3px"
        ]
        [ div [ class "col s4", style "border-right" "solid 1px #bbb", style "padding" "0" ] [ text "ショック" ]
        , div [ class "col s8 font-ss" ] [ text shock ]
        ]


secretContent se =
    div [ class "card-content font-ss", style "padding" "0", style "margin" "2px" ]
        [ text se
        ]



--


open title mission =
    div [ class "card white insane-wrapper", style "width" "190px", style "height" "300px" ]
        [ div [ class "card-title black-text", style "flex" "1", style "text-align" "center" ]
            [ text title
            ]
        , openInnerCard mission
        ]


openInnerCard mission =
    div
        [ class "card black"
        , style "display" "flex"
        , style "width" "180px"
        , style "height" "290px"
        , style "flex-direction" "column"
        , style "justify-content" "center"
        , style "align-items" "center"
        ]
        [ div
            [ class "card white"
            , style "width" "170px"
            , style "height" "280px"
            , style "margin-bottom" "0.5rem"
            ]
            [ div [ class "black-text font-s", style "flex" "1", style "text-align" "center" ] [ text "使命" ]
            , openInnerWrapper mission
            ]
        ]


openInnerWrapper mission =
    div [ class "insane-wrapper" ]
        [ openMain mission
        ]


openMain mission =
    div
        [ class "card white"
        , style "width" "160px"
        , style "height" "220px"
        , style "margin" "1px"
        ]
        [ openContent mission
        ]


openContent mission =
    div [ class "card-content font-ss", style "padding" "0", style "margin" "2px" ]
        [ text mission
        ]
