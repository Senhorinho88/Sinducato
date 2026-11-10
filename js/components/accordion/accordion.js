angular.module('sindados.accordion', []).directive('sindAccordion', function () {
    return { restrict: 'E', scope: { itens: '=', identificador: '@' }, templateUrl: 'js/components/accordion/accordion.html',
        link: function (scope) {
            scope.$watchCollection('itens', function (itens) {
                angular.forEach(itens, function (item) { item.aberto = false; });
            });
            scope.alternar = function (selecionado) {
                var estavaAberto = selecionado.aberto;
                angular.forEach(scope.itens, function (item) { item.aberto = false; });
                selecionado.aberto = !estavaAberto;
            };
        }
    };
});
