const acorn = require('acorn');
const walk = require("acorn-walk");
const escodegen = require('escodegen');

exports.modulePathRewrite = function (code) {

	const tree = acorn.parse(code, {
		sourceType: 'module'
	});

	// replace
	walk.ancestor(tree, {
		Literal(node, ancestors) {
			const importStatement = ancestors.find(n => n.type === 'ImportDeclaration');

			if (importStatement) {
				if (!/[\.|\/]/g.test(node.value)) {
					node.value = `/__module__/${node.value}`
				}
			}
		}
	})

	const transformCode = escodegen.generate(tree);

	if (transformCode) {
		return transformCode;
	}

	return code;
}