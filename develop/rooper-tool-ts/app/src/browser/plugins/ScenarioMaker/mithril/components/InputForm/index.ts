import * as m from 'mithril';
import TragedySetForm from './TragedySetForm';
import PlotForm from './PlotForm';

class InputForm implements m.Component<{}, {}> {
  public view() {
    return m(PlotForm);
  }
}

export default InputForm;
