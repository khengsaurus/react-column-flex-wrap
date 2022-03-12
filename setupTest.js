const React = require("react");
const { configure } = require("enzyme");
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");

configure({ adapter: new Adapter() });

const { defineProperty } = Object;
Object.defineProperty = function (object, name, meta) {
  if (meta.get && !meta.configurable) {
    return defineProperty(object, name, {
      ...meta,
      configurable: true,
    });
  }

  return defineProperty(object, name, meta);
};

jest.setTimeout(10 * 1000);
