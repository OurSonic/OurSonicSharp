// Type definitions for Angular JS 1.0
// Project: http://angularjs.org
// Definitions by: Diego Vilar <http://github.com/diegovilar>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using System.Text;

//declare var angular: ng.IAngularStatic;

namespace ng
{
    ///////////////////////////////////////////////////////////////////////////
    // FormController
    // see http://docs.angularjs.org/api/ng.directive:form.FormController
    ///////////////////////////////////////////////////////////////////////////
    [Imported]
    public interface IFormController
    {
#if TODO
        $pristine: bool;
        $dirty: bool;
        $valid: bool;
        $invalid: bool;
        $error: any;
#endif
    }

    ///////////////////////////////////////////////////////////////////////////
    // NgModelController
    // see http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController
    ///////////////////////////////////////////////////////////////////////////
    [Imported]
    public interface INgModelController
    {
#if TODO
        $render(): void;
        $setValidity(validationErrorKey: string, isValid: bool): void;
        $setViewValue(value: string): void;

        // XXX Not sure about the types here. Documentation states it's a string, but
        // I've seen it receiving other types throughout the code.
        // Falling back to any for now.
        $viewValue: any;

        // XXX Same as avove
        $modelValue: any;
        
        $parsers: IModelParser[];
        $formatters: IModelFormatter[];
        $error: any;
        $pristine: bool;
        $dirty: bool;
        $valid: bool;
        $invalid: bool;        
#endif
    }

    [Imported]
    public interface IModelParser
    {
#if TODO
        (value: any): any;
#endif
    }

    [Imported]
    public interface IModelFormatter
    {
#if TODO
        (value: any): any;
#endif
    }

    [Imported]
    public interface IAngularEvent
    {
#if TODO
        targetScope: IScope;
        currentScope: IScope;
        name: string;        
        preventDefault: Function;
        defaultPrevented: bool;

        // Available only events that were $emit-ted
        stopPropagation?: Function;
#endif
    }    

    ///////////////////////////////////////////////////////////////////////////
    // WindowService
    // see http://docs.angularjs.org/api/ng.$window
    ///////////////////////////////////////////////////////////////////////////
    [Imported]
    public interface IWindowService 
#if TODO
: Window
#endif
{
}

    ///////////////////////////////////////////////////////////////////////////
    // BrowserService
    // TODO undocumented, so we need to get it from the source code
    ///////////////////////////////////////////////////////////////////////////
    [Imported]
    public interface IBrowserService { }

    ///////////////////////////////////////////////////////////////////////////
    // FilterService
    // see http://docs.angularjs.org/api/ng.$filter
    // see http://docs.angularjs.org/api/ng.$filterProvider
    ///////////////////////////////////////////////////////////////////////////
    [Imported]
    public interface IFilterService
    {
        
#if TODO
        (name: string): Function;
#endif
    }

    [Imported]
    public interface IFilterProvider : IServiceProvider
    {
#if TODO
        register(name: string, filterFactory: Function): IServiceProvider;
#endif
    }

    ///////////////////////////////////////////////////////////////////////////
    // LocaleService
    // see http://docs.angularjs.org/api/ng.$locale
    ///////////////////////////////////////////////////////////////////////////
    [Imported]
    public interface ILocaleService
    {
#if TODO
        id: string;

        // These are not documented
        // Check angular's i18n files for exemples
        NUMBER_FORMATS: ILocaleNumberFormatDescriptor;
        DATETIME_FORMATS: any;
        pluralCat: (num: any) => string;
#endif
    }

    [Imported]
    public interface ILocaleNumberFormatDescriptor
    {
#if TODO
        DECIMAL_SEP: string;
        GROUP_SEP: string;
        PATTERNS: ILocaleNumberPatternDescriptor[];
        CURRENCY_SYM: string;
#endif
    }

    [Imported]
    public interface ILocaleNumberPatternDescriptor
    {
#if TODO
        minInt: number;
        minFrac: number;
        maxFrac: number;
        posPre: string;
        posSuf: string;
        negPre: string;
        negSuf: string;
        gSize: number;
        lgSize: number;
#endif
    }

    [Imported]
    public interface ILocaleDateTimeFormatDescriptor
    {
#if TODO
        MONTH: string[];
        SHORTMONTH: string[];
        DAY: string[];
        SHORTDAY: string[];
        AMPMS: string[];
        medium: string;
        short: string;
        fullDate: string;
        longDate: string;
        mediumDate: string;
        shortDate: string;
        mediumTime: string;
        shortTime: string;
#endif
    }
}
