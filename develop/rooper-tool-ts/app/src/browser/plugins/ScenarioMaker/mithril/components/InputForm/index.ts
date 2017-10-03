import * as m from 'mithril';
import TragedySetForm from './TragedySetForm';

class InputForm implements m.Component<{}, {}> {
  public view() {
    return [m(TragedySetForm)];
  }
}

export default TragedySetForm;
