export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon}  text-xl`;
    if (binding.arg === "full") {
      iconClass = binding.value;
    }
    if (binding.value.right) {
      iconClass += " float-right";
    }
    if (binding.value.yellow) {
      iconClass += " text-yellow-400";
    } else {
      iconClass += "  text-green-400";
    }
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
