import '@enplug/dashboard-sdk';
const elem = document.getElementById('status');

const { enplug } = window;

function triggerSave() {
  // save a dummy asset so we get the save
  // dialog and can deploy to display groups
  const asset = {
    Created: new Date(),
    Value: {},
    VenueIds: [],
  };
  return enplug.account.saveAsset(asset, {
    loadingMessage: 'Saving changes...',
    successMessage: 'Changes saved',
    showDeployDialog: true
  });
}

function setButtons() {
  const button = {
    text: 'Deploy to Displays',
    class: 'btn btn-primary',
    action: triggerSave,
    disabled: false,
  };
  enplug.dashboard.setHeaderButtons(button);
}

function start() {
  document.getElementById('dashboard').style.display = 'block';
  setButtons();
  enplug.dashboard.pageLoading(false);
}

const dashboard = {
  start,
};

export default dashboard;
