port module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Url exposing (Url)
import Url.Parser as UrlParser

port toJs : String -> Cmd msg

type alias Handout = 
    { id : Int
    , title : String
    }

type alias Model =
    {
      handoutList: List Handout
    }


init : Int -> ( Model, Cmd Msg )
init flags =
    ( initialModel, Cmd.none )

initialModel : Model
initialModel = 
    { handoutList = 
        [ Handout 1 "item1" 
        , Handout 2 "item2"
        , Handout 3 "item3"
        ]
    }

-- UPDATE


type Msg
    = None


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        None ->
            ( model, Cmd.none )

-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ p [][],
            div[class "print"][
              viewList model.handoutList
            ]
        ]

viewList : List Handout -> Html Msg
viewList models = 
    handouts models

handouts models =
  ul [] (List.map insaneHandout models)

insaneHandout : Handout -> Html Msg
insaneHandout model = 
  li[][
    div[class "insane-card card"][
      div[class "f1"][
        open model.title
      ],
      div[class "f1"][
        secret
      ]
    ]
  ]

secret = 
  div[class "card black insane-wrapper", style "width" "190px",style  "height" "300px"][
    div[class "card-title white-text", style "flex" "1", style "text-align" "center"][text "Handout"],
    secretInnerCard
  ]
secretInnerCard =
   div[class "card white", style "display" "flex"
                         , style "width" "180px"
                         , style "height" "290px"
                         , style "flex-direction" "column"
                         , style "justify-content" "center"
                         , style "align-items" "center"][
      div[class "card black"
         , style "width" "170px"
         , style "height" "280px"
         , style "margin-bottom" "0.5rem"][
        div[class "white-text font-s", style "flex" "1", style "text-align" "center"][text "秘密"],
        secretInnerWrapper
        ,div[class "white-text font-s insane-secret-footer"][text "この秘密を自分から明らかに"]
        ,div[class "white-text font-s insane-secret-footer"][text "することはできない"]
      ]
    ]
secretInnerWrapper = div[class "insane-wrapper"][
          secretMain
        ]
secretMain = div[class "card white"
                , style "width" "160px"
                , style "height" "180px"
                , style "margin" "1px"][
            secretShock,
            secretContent
          ]
secretShock = div[class "row font-m"
                , style "border-bottom" "3px double #bbb"
                , style "margin-bottom" "3px"][
              div[class "col s4", style "border-right" "solid 1px #bbb", style "padding" "0"][text "ショック"],
              div[class "col s8 font-ss"][text ""]
            ]
secretContent = div[class "card-content font-ss", style "padding" "0", style "margin" "2px"][
              text "てすと"
            ]
--

open title= 
  div[class "card white insane-wrapper", style "width" "190px",style  "height" "300px"][
    div[class "card-title black-text", style "flex" "1", style "text-align" "center"][
      text title
    ],
    openInnerCard
  ]
openInnerCard =
   div[class "card black", style "display" "flex"
                         , style "width" "180px"
                         , style "height" "290px"
                         , style "flex-direction" "column"
                         , style "justify-content" "center"
                         , style "align-items" "center"][
      div[class "card white"
         , style "width" "170px"
         , style "height" "280px"
         , style "margin-bottom" "0.5rem"][
        div[class "black-text font-s", style "flex" "1", style "text-align" "center"][text "使命"],
        openInnerWrapper
      ]
    ]
openInnerWrapper = div[class "insane-wrapper"][
          openMain
        ]
openMain = div[class "card white"
                , style "width" "160px"
                , style "height" "220px"
                , style "margin" "1px"][
            openContent
          ]

openContent = div[class "card-content font-ss", style "padding" "0", style "margin" "2px"][
              text "てすと"
            ]

main : Program Int Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }
