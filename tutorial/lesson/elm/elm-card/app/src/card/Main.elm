port module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Url exposing (Url)
import Url.Parser as UrlParser

port toJs : String -> Cmd msg


type alias Model =
    Int


init : Int -> ( Model, Cmd Msg )
init flags =
    ( flags, Cmd.none )



-- -- URL Parsing and Routing
--
--
-- navigationHandler : Url -> Msg
-- navigationHandler =
--     urlParser >> Set
--
--
-- urlParser : Url -> Int
-- urlParser url =
--     url
--         |> UrlParser.parse UrlParser.int
--         |> Maybe.withDefault 0
--
-- UPDATE


type Msg
    = Inc
    | Set Int


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        Inc ->
            ( add1 model, toJs "Hello Js" )

        Set m ->
            ( m, toJs "Hello Js" )


{-| increments the counter

    add1 5 --> 6

-}
add1 : Model -> Model
add1 model =
    model + 1



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ header []
            [ img [ src "/images/logo.png" ] []
            , h1 [] [ text "Card!" ]
            ]
        , p [] [ text "Click on the button below to increment the state. " ]
        , div []
            [ button
                [ class "pure-button pure-button-primary"
                , onClick Inc
                ]
                [ text "+ 1" ]
            , text <| String.fromInt model
            ]
        , p [] [ text "Then make a change to the source code and see a how the state is retained after you recompile." ]
        , p []
            [ text "And now don't forget to add a star to the Github repo "
            , a [ href "https://github.com/simonh1000/elm-webpack-starter" ] [ text "elm-webpack-starter" ]
            ]
            , div[class "print"][
              insaneHandout
            ]
        ]

insaneHandout : Html Msg
insaneHandout = 
  div[class "insane-card card"][
    div[class "f1"][
      open
    ],
    div[class "f1"][
      secret
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

open = 
  div[class "card white insane-wrapper", style "width" "190px",style  "height" "300px"][
    div[class "card-title black-text", style "flex" "1", style "text-align" "center"][text "カードタイトル"],
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
