(function ($)
{
    $.tableScrollableSort = function (headerTable, bodyTable)
    {
        var defaults = 
        {
            cssHeader : "header", cssAsc : "headerSortUp", cssDesc : "headerSortDown", sortInitialOrder : "asc", 
            sortList : [], headerList : [], widgetZebra : {
                css : ["even", "odd"] 
            },
            selectorHeaders : 'thead th' 
        }
        settings = $.extend(defaults);
        tBodies = $(bodyTable)[0].tBodies;
        totalRows = (tBodies && tBodies[0].rows.length) || 0;
        sortCSS = [settings.cssDesc, settings.cssAsc];

        headers = buildHeader(headerTable);
        bodies = buildBodies(bodyTable);

        headers.click( function (e)
        {
         if ( totalRows > 0 )
         {
             updateHeaderSortCount(this);
             setHeadersCss(this, headers, sortCSS);
             appendToTable(bodyTable, multisort(this, bodyTable, settings.sortList, bodies));
         }
        });
        applyWidget(bodyTable);
    };
    /* thead>thにソート用スタイルを設定する
     * ソート並び順保持用にバッファを準備する
     */
    function buildHeader(headerTable) 
    {
        $tableHeaders = $(settings.selectorHeaders, $(headerTable)[0]).each( function (index)
        {
            if ( totalRows > 0 )
            {
                $(this).addClass(settings.cssHeader);
            }
            // add cell to headerList
            settings.headerList[index] = this;
            settings.sortList[index] = - 1;
        });
        return $tableHeaders;
    }
    /* sort用にデータのみをcacheに保存する
     * 
     */
    function buildBodies(bodyTable) 
    {
        var tBodies = $(bodyTable)[0].tBodies;
        var totalRows = (tBodies && tBodies[0].rows.length) || 0, totalCells = (tBodies[0].rows[0] && tBodies[0].rows[0].cells.length) || 0, 
        cache = {
            row : [], normalized : [] 
        };
        for (var i = 0; i < totalRows; ++i) 
        {
            /** Add the table data to main data array */
            var c = $(tBodies[0].rows[i]), cols = [];
            cache.row.push(c);
            for (var j = 0; j < totalCells; ++j) {
                cols.push(c[0].cells[j].innerText);
            }
            cols.push(cache.normalized.length);
            // add position for rowCache
            cache.normalized.push(cols);
            cols = null;
        };
        return cache;
    }
    // カラム毎の並び順DESC,ASCをトグルする。
    function updateHeaderSortCount(header) 
    {
        // get current column index
        var i = header.cellIndex;
        for (var j = 0; j < settings.sortList.length; j++) {
            var s = settings.sortList[j];
            if ( i == j ) {
                s++;
                settings.sortList[j] = s % 2;
            }
        }
    }
    // ヘッダのCSSを設定する
    function setHeadersCss(column, headers, css) 
    {
        // remove all header information
        headers.removeClass(css[0]).removeClass(css[1]);
        for (var i = 0; i < headers.length; i++) 
        {
            if ( column.cellIndex == i ) {
                $(headers[i]).addClass(css[settings.sortList[i]]);
            }
            else {
                $(headers[i]).addClass(settings.cssHeader);
            }
        }
    }
    // ソートメソッド
    function multisort(column, table, sortList, cache) 
    {
        var dynamicExp = "var sortWrapper = function(a,b) {", i = column.cellIndex;
        var order = sortList[column.cellIndex];

        var s = (order == 0) ? makeSortFunction("text", "asc", i) : makeSortFunction("text", "desc", i);
        var e = "e" + i;

        dynamicExp += "var " + e + " = " + s;
        dynamicExp += "if(" + e + ") { return " + e + "; } ";
        dynamicExp += "else { ";
        dynamicExp += "return 0; ";
        dynamicExp += "}};";

        eval(dynamicExp);
        cache.normalized.sort(sortWrapper);
        return cache;
    };
    // ソート用関数の生成
    function makeSortFunction(type, direction, index) 
    {
        var a = "a[" + index + "]", b = "b[" + index + "]";
        if (type == 'text' && direction == 'asc') 
        {
            return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));";
        }
        else if (type == 'text' && direction == 'desc') 
        {
            return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));";
        }
        else if (type == 'numeric' && direction == 'asc') 
        {
            return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));";
        }
        else if (type == 'numeric' && direction == 'desc') 
        {
            return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));";
        }
    };
    // ソート用サブ関数の生成
    function makeSortText(i) 
    {
        return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));";
    };
    function makeSortTextDesc(i) 
    {
        return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));";
    };
    function makeSortNumeric(i) 
    {
        return "a[" + i + "]-b[" + i + "];";
    };
    function makeSortNumericDesc(i) 
    {
        return "b[" + i + "]-a[" + i + "];";
    };
    function sortText(a, b) 
    {
        if (table.config.sortLocaleCompare) {
            return a.localeCompare(b);
        }
        return ((a < b) ? - 1 : ((a > b) ? 1 : 0));
    };
    function sortTextDesc(a, b) 
    {
        if (table.config.sortLocaleCompare) {
            return b.localeCompare(a);
        }
        return ((b < a) ? - 1 : ((b > a) ? 1 : 0));
    };
    function sortNumeric(a, b) 
    {
        return a - b;
    };
    function sortNumericDesc(a, b) 
    {
        return b - a;
    };
    function getCachedSortType(parsers, i) 
    {
        return parsers[i].type;
    };

    // DataTableにデータを書き戻す
    function appendToTable(table, cache) 
    {
        var c = cache, r = c.row, n = c.normalized, totalRows = n.length, checkCell = (n[0].length - 1), 
        tableBody = $(table)[0].tBodies, rows = [];
        for (var i = 0; i < totalRows; i++) 
        {
            var pos = n[i][checkCell];
            rows.push(r[pos]);
            //var o = ;
            var l = r[pos].length;
            for (var j = 0; j < l; j++) {
                tableBody[0].appendChild(r[pos][j]);
            }
        }
        // apply table widgets
        applyWidget(tableBody);
    }

    // tbody>tdのスタイルを設定する
    function applyWidget(table) 
    {
        var $tr, row = - 1, odd;
        $("tr:visible", table).each(function (i) 
        {;
            $tr = $(this);
            if (!$tr.hasClass(settings.cssChildRow)) {
                row++;
            }
            odd = (row % 2 == 0);
            $tr.removeClass(settings.widgetZebra.css[odd ? 0 : 1]) .addClass(settings.widgetZebra.css[odd ? 1 : 0]) 
        });
    }
})(jQuery);