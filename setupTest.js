const React = require("react");
const { configure } = require("enzyme");
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");

configure({ adapter: new Adapter() });

jest.setTimeout(10000); // in milliseconds
