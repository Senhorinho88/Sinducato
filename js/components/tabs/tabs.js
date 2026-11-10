angular.module('sindados.tabs', []).directive('sindTabs', function () {
    return { restrict: 'E', scope: { abas: '=', titulo: '@' }, templateUrl: 'js/components/tabs/tabs.html',
        link: function (scope, element) {
            scope.$watchCollection('abas', function () { scope.ativa = 0; });
            scope.selecionar = function (indice) { scope.ativa = indice; };
            scope.teclado = function (evento, indice) {
                var total = scope.abas.length, teclas = { ArrowRight: (indice + 1) % total, ArrowLeft: (indice + total - 1) % total, Home: 0, End: total - 1 };
                if (teclas[evento.key] === undefined) return;
                evento.preventDefault();
                scope.selecionar(teclas[evento.key]);
                element[0].querySelectorAll('[role="tab"]')[scope.ativa].focus();
            };
        }
    };
});
