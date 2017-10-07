import * as m from 'mithril';
import PlotForm from './PlotForm';
import TragedySetForm from './TragedySetForm';

class InputForm implements m.Component<{}, {}> {
  public view() {
    return m(PlotForm);
  }
}

export default InputForm;
