module Msgs exposing(..)

import Date exposing (Date)

type Msg
    = NoOp
    | Increase Int
    | UpdateCountStepInput String
    | UpdateDatetime Date
