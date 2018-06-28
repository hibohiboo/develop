module Types.Model exposing (Model, gain, initial, lose)

{-| This module have a knowledge of model.
For example, a initial state and a way of how to change it.


# Definition

@docs Model


# Initial Model

@docs initial


# Changing Model

@docs gain, lose

-}


{-| Type of model.
-}
type alias Model =
    Int


{-| Initial model.
-}
initial : Model
initial =
    0


{-| Change a model to gained form.
-}
gain : Model -> Model
gain m =
    m + 1


{-| Change a model to lost form.
-}
lose : Model -> Model
lose m =
    m - 1
