angular.module('sindados.dropdown', []).directive('sindDropdown', ['$document', '$timeout', function ($document, $timeout) {
    return { restrict: 'E', scope: { opcoes: '=', rotulo: '@', onSelect: '&' }, templateUrl: 'js/components/dropdown/dropdown.html',
        link: function (scope, element) {
            scope.aberto = false;
            function focar(indice) { var itens = element[0].querySelectorAll('[role="menuitem"]'); if (itens[indice]) itens[indice].focus(); }
            function fecharFora(evento) { if (scope.aberto && !element[0].contains(evento.target)) scope.$apply(function () { scope.aberto = false; }); }
            scope.escolher = function (item) { scope.aberto = false; scope.onSelect({ item: item }); element[0].querySelector('button').focus(); };
            scope.teclado = function (evento, indice) {
                var total = (scope.opcoes || []).length;
                if (evento.key === 'Escape') { evento.preventDefault(); scope.aberto = false; element[0].querySelector('button').focus(); }
                else if (total && ['ArrowDown', 'ArrowUp', 'Home', 'End'].indexOf(evento.key) !== -1) {
                    evento.preventDefault(); scope.aberto = true;
                    var destino = evento.key === 'Home' ? 0 : evento.key === 'End' ? total - 1 : (indice + (evento.key === 'ArrowDown' ? 1 : total - 1)) % total;
                    $timeout(function () { focar(destino); });
                } else if (evento.key === 'Tab') scope.aberto = false;
            };
            $document.on('click', fecharFora);
            scope.$on('$destroy', function () { $document.off('click', fecharFora); });
        }
    };
}]);
