"use strict";

exports.__esModule = true;
exports["default"] = getGroupId;

function getGroupId(group) {
  return group.name + "-" + Math.random().toString(36).substr(2, 9);
}