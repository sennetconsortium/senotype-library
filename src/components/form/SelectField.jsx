import { SEARCH_SENOTYPE } from '@/config/search/senotype';
import InputField from './InputField';
import PREDICATE from '@/lib/predicate';

function SelectField({ p, getOptions, getSearchBehavior, senotype }) {
  return (
    <>
      <InputField
        dropIcon={
          PREDICATE.isExternalSource(p.field) ? (
            <i className="bi bi-search"></i>
          ) : undefined
        }
        key={p.field}
        labelTooltip={p.ui.tooltip}
        label={p.label || SEARCH_SENOTYPE.searchQuery.facets[p.field]?.label}
        id={p.field}
        selectData={getOptions(p)}
        controlProps={{
          ...getSearchBehavior(p),
          notFoundContent: (
            <span className="text-black">
              {p.ui.tooltip && (
                <span>
                  {p.ui.tooltip}
                  <br /> Then press <strong>ENTER or return</strong> key to
                  perform search.
                </span>
              )}
              {!p.ui.tooltip && <span>No results found.</span>}
            </span>
          ),
          defaultValue: senotype[p.field]
            ? senotype[p.field][0]?.term
            : undefined,
          required: p.ui.required,
        }}
      />
    </>
  );
}

export default SelectField;
