craType="$1"
echo "Cra Type : $craType"

# Add options CRA template
isCraProps=""
isDefaultCraTemplate=""
skipWorkpaceJson=""
if [ $craType == "template" ];
then
  echo "Add isCraTemplate and skipWorkspaceJson"
  isCraProps="--isCraTemplate"
	isDefaultCraTemplate="--isDefaultCraTemplate"
  skipWorkpaceJson="--skipWorkspaceJson"
fi
echo ""

# Debug
debug=""
if [ $debug == "true" ];
then
  echo "Mode Debug"
  debug="--dry-run"
fi
echo ""

projectName="react-dashboard-$craType"
generateCommand="npx nx generate @kuda-terbang/react-generator:react-dashboard-template $projectName --style=styled-components $skipWorkpaceJson --e2eTestRunner=none --designSystemProject=ui-mui-react-example --designTokenProject=design-token-example $isCraProps --no-interactive $isDefaultCraTemplate $debug"

projectPath=../../apps/$projectName
echo "Project Path : $projectPath"
echo "Run : $generateCommand"
echo ""

if [ ! -d $projectPath ]
then
  echo "Directory $projectPath DOES NOT exists."
  eval "$generateCommand"
else
  echo "Directory $projectPath EXISTS."
  rm -rf $projectPath
  # TODO: update workspace.json and tsconfig.base.json
  eval "$generateCommand"
fi
